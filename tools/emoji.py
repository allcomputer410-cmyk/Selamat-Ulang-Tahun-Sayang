#!/usr/bin/env python3
"""
Unduh & perkecil emoji animasi (Google Noto Animated Emoji, CC BY 4.0) yang dipakai
di website, lalu simpan di assets/emoji/ supaya tidak bergantung CDN & lebih hemat kuota.

Pemakaian (dari root repo):
    pip install pillow
    python3 tools/emoji.py

Jalankan ulang setiap kali kamu menambah emoji baru di js/config.js.
Emoji yang tidak tersedia versi animasinya akan tetap tampil sebagai emoji biasa.
"""
import io
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "emoji"
SIZE = 160     # px — cukup tajam untuk layar retina pada ukuran tampil ~70px
STEP = 2       # ambil 1 dari tiap 2 frame
QUALITY = 68
SOURCES = ["index.html", "js/main.js", "js/config.js"]
CDN = "https://fonts.gstatic.com/s/e/notoemoji/latest/{}/512.webp"

# Emoji (termasuk urutan ZWJ). Simbol teks biasa (✓, ✦, dll.) otomatis dilewati karena tidak ada versi animasinya.
EMOJI_RE = re.compile(
    "[\U0001F000-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\u2300-\u23FF]\uFE0F?"
    "(?:\u200D[\U0001F000-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\u2300-\u23FF]\uFE0F?)*"
)


def code(ch: str) -> str:
    """Kode file lokal: codepoint hex digabung "_" tanpa FE0F (harus sama dengan js/main.js)."""
    return "_".join(f"{ord(c):x}" for c in ch if c != "\ufe0f")


def fetch(ch: str) -> bytes:
    """Nama di CDN Noto kadang memakai _fe0f (mis. 2764_fe0f), kadang tidak."""
    raw = "_".join(f"{ord(c):x}" for c in ch)
    last = None
    for c in dict.fromkeys([raw, code(ch), code(ch) + "_fe0f"]):
        try:
            with urllib.request.urlopen(CDN.format(c), timeout=30) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last = e
    raise last


def resize_animated(data: bytes) -> bytes:
    """Perkecil ke SIZE px & ambil setiap frame ke-2 (durasi digabung) — ±3x lebih hemat."""
    im = Image.open(io.BytesIO(data))
    frames, durations = [], []
    for i in range(getattr(im, "n_frames", 1)):
        im.seek(i)
        im.load()
        dur = im.info.get("duration") or 33
        if i % STEP == 0:
            fr = im.convert("RGBA").resize((SIZE, SIZE), Image.LANCZOS)
            # buang piksel hampir-transparan (sisa resize) agar tidak muncul "kotak" saat diberi drop-shadow
            fr.putalpha(fr.getchannel("A").point(lambda v: 0 if v < 24 else v))
            frames.append(fr)
            durations.append(dur)
        else:
            durations[-1] += dur
    buf = io.BytesIO()
    frames[0].save(
        buf, "WEBP", save_all=True, append_images=frames[1:], duration=durations,
        loop=0, quality=QUALITY, method=4, minimize_size=True,
    )
    return buf.getvalue()


def main() -> int:
    text = "".join((ROOT / s).read_text(encoding="utf-8") for s in SOURCES)
    wanted = sorted({m.replace("\ufe0f", "") for m in EMOJI_RE.findall(text)})
    OUT.mkdir(parents=True, exist_ok=True)
    available, total = [], 0
    for ch in wanted:
        c = code(ch)
        dest = OUT / f"{c}.webp"
        if not dest.exists():
            try:
                dest.write_bytes(resize_animated(fetch(ch)))
            except urllib.error.HTTPError:
                print(f"  -  {ch}  ({c}) tidak ada versi animasi, pakai emoji biasa")
                continue
            except Exception as e:  # jaringan, dsb.
                print(f"  !  {ch}  ({c}) gagal: {e}")
                continue
        size = dest.stat().st_size
        total += size
        available.append(c)
        print(f"  ✓  {ch}  {c}.webp  {size // 1024} KB")
    # hapus file emoji yang sudah tidak dipakai lagi
    for f in OUT.glob("*.webp"):
        if f.stem not in available:
            f.unlink()
            print(f"  🗑  {f.name} dihapus (tidak dipakai)")
    (ROOT / "js" / "emoji-local.js").write_text(
        "// Dibuat otomatis oleh tools/emoji.py — daftar emoji animasi yang tersimpan di assets/emoji/\n"
        f"window.LOCAL_EMOJI = {json.dumps(available)};\n",
        encoding="utf-8",
    )
    print(f"\n{len(available)} emoji tersimpan, total {total // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
