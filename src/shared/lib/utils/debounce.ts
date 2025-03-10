export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: number

  return (...args: Parameters<F>): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }
}

// debounce(async function () {
//   const { value } = event.target as HTMLTextAreaElement

//   if (value) {
//     await bookModel.fetchBooks(value)
//   }
// }, 100)
