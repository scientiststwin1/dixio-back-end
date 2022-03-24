export class WsResponse {
  constructor(
    public success: boolean,
    public code: number,
    public data: any,
    public meta: any = null,
    public message: string | object | null = null,
  ) {}
}
