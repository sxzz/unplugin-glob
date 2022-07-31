export function parsePattern(id: string): {
  src: string
  pattern: string
} {
  const [src, rawQuery] = id.split(`?`, 2)
  const params = new URLSearchParams(rawQuery)
  return {
    src,
    pattern: params.get('pattern')!,
  }
}
