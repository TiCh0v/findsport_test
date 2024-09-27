import "./App.scss"

import { DynamicFormBuilder } from "@/widgets/DynamicFormBuilder/DynamicFormBuilder";


export const App = () => {

  return (
    <div className='app'>
      В задании нет требований на счет валидации, так что, допустим, все поля должны быть заполнены и в англ. раскладке
      <DynamicFormBuilder />
    </div>
  );
};
