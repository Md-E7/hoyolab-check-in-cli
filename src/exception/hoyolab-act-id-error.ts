export class HoyolabActIdError extends Error {
  public retcode: number

  constructor (message: string, retcode: number) {
    super(message)
    this.retcode = retcode
  }
}
