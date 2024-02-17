export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function humanize(str: string) {
  return capitalizeFirstLetter(str).split("_").join(" ")
}
