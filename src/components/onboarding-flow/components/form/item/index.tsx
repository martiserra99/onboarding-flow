import { CardChoiceView, type CardChoice } from "./card-choice";
import { PillChoiceView, type PillChoice } from "./pill-choice";
import { TechChoiceView, type TechChoice } from "./tech-choice";
import { SwitchView, type Switch } from "./switch";

export type Item = CardChoice | PillChoice | TechChoice | Switch;

export function ItemView(item: Item) {
  switch (item.type) {
    case "cardChoice": {
      return <CardChoiceView {...item} />;
    }
    case "pillChoice": {
      return <PillChoiceView {...item} />;
    }
    case "techChoice": {
      return <TechChoiceView {...item} />;
    }
    case "switch": {
      return <SwitchView {...item} />;
    }
  }
}
