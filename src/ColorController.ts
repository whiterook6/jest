export class ColorController {
  private static colors: string[];

  constructor(){
    if (!ColorController.colors){
      this.reset();
    }
  }

  public reset = async () => {
    ColorController.colors = [];
  }

  public getColors = async () => {
    return ColorController.colors;
  };

  public addColor = async (color: string) => {
    const {colors} = ColorController;
    if (colors.includes(color)){
      throw new Error(`${color} already exists`);
    }

    colors.push(color);
    return colors;
  };
};
