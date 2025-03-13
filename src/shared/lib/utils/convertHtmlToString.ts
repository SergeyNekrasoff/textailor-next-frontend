export function convertHtmlToString(htmlString: string): string {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, '')
}
