declare module "plaiceholder" {
  export interface PlaiceholderResult {
    img: {
      width: number;
      height: number;
    };
    base64: string;
  }

  export function getPlaiceholder(
    src: string,
    options?: Partial<{ size: number; quality: number }>
  ): Promise<PlaiceholderResult>;
}
