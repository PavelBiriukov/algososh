import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  let [array, setArray] = useState<any[]>([]);
  const [isShownTimeout, setIsShownTimeout] = useState<boolean>(false);

  const addItem = (value: string) => {
    setIsShownTimeout(true)
    setArray([array?.push(value)]);
    setArray([...array]);
    setValue('')
    setIsShownTimeout(false)
  }
  const delItem = () => {
    setArray([array?.pop()]);
    setArray([...array]);
  }
  const clear= () => {
    setArray([array.splice(0, array.length)]);
    setArray([...array]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.input}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          type="text" value={value}
          extraClass={`${styles.inputStack}`}
        />
        <Button
          text='Добавить'
          onClick={() => addItem(value)}
          disabled={value ? false : true}
          isLoader={isShownTimeout}
        />
        <Button
          text='Удалить'
          onClick={delItem}
          disabled={array.length ? false : true}
        />
        <Button
          text='Очистить'
          onClick={clear}
          extraClass={`${styles.btnNewArr} ${styles.btn}`}
          disabled={array.length ? false : true}
        />
      </div>
      <ul className={styles.circle}>
          {array?.map((item, index: number) => {
            return (
              <li key={index}>< Circle
                head={array.length - 1 === index ? "top" : ''}
                letter={item}
                key={index}
                index={index}
                /* state={index === currentIndex ? 'changing' : 'default'} */ />
              </li>
            )
          })}
        </ul>
    </SolutionLayout>
  );
};
