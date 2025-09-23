#!/bin/bash
# Watch for new or modified images and convert them to WebP
# After conversion, remove the original file (except for .webp or .svg)

WATCH_DIR="$(pwd)"

convert_to_webp() {
  FILE="$1"
  EXT="${FILE##*.}"
  LOWER_EXT=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')

  case "$LOWER_EXT" in
    jpg|jpeg|png|gif)
      OUT="${FILE%.*}.webp"
      if [ ! -f "$OUT" ]; then
        if cwebp -quiet -q 100 "$FILE" -o "$OUT"; then
          rm -f "$FILE"
        fi
      fi
      ;;
  esac
}

find "$WATCH_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -iname "*.svg" |
while read -r FILE; do
  convert_to_webp "$FILE"
done

inotifywait -m -r -e close_write,create,move "$WATCH_DIR" --format "%w%f" |
while read -r NEWFILE; do
  convert_to_webp "$NEWFILE"
done
