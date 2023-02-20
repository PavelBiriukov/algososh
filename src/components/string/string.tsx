import React, {useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import cl from './stringInput.module.css'
export const StringComponent: React.FC = () => {
  

  const [value, setValue] = useState('');
  
  const fsdfds = () => {
    console.log(value);
  }
  return (
    <SolutionLayout title="Строка">
      <div className={cl.block}>
        <Input value={value} onChange={e => setValue(e.target.value)} maxLength={11} extraClass={cl.input} isLimitText = {true}/>
        <Button onClick={() => fsdfds()} text="Развернуть" extraClass={cl.button}/>
      </div>
    </SolutionLayout>
  );
};
