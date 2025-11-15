export interface IAiProvider {
  evaluate(input: any, options?: Record<string, any>): Promise<any>;
}
