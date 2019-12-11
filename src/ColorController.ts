import { getConnection } from "./Database";

export class ColorController {
  private static colors: string[];

  constructor(){
    if (!ColorController.colors){
      this.reset();
    }
  }

  public migrate = async () => {
    const connection = await getConnection();
    try {
      connection.query(`CREATE TABLE IF NOT EXISTS \`colors\` (
  \`id\` int unsigned NOT NULL AUTO_INCREMENT,
  \`name\` varchar(64) NOT NULL,
  \`value\` varchar(16) NOT NULL COMMENT 'Hex Value like #abcdef',
  PRIMARY KEY(\`id\`),
  UNIQUE(\`name\`),
  INDEX(\`value\`)
) ENGINE='InnoDB' COLLATE 'utf8mb4_general_ci';`)
    } finally {
      connection.destroy();
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
