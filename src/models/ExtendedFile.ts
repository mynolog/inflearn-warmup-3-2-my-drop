export class ExtendedFile extends File {
  path: string
  relativePath: string

  constructor(
    fileParts: BlobPart[],
    fileName: string,
    options: FilePropertyBag,
    path: string,
    relativePath: string,
  ) {
    super(fileParts, fileName, options)
    this.path = path
    this.relativePath = relativePath
  }
}
