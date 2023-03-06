import React, { useState } from "react";
import { delay } from "../../constants/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";


import styles from './queue-page.module.css';

const time = 500;

export const QueuePage: React.FC = () => {
  const size = 8;
  const [queue] = useState(new Queue<string>(size))
  const [inputValue, setInputValue] = useState<string>('');
  const [stack, setStack] = useState<(string | undefined)[]>(queue.printQueue());
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [tail, setTail] = useState<number>(queue.getTail());
  const [head, setHead] = useState<number | null>(null);
  const [isShownTimeout, setIsShownTimeout] = useState<string>('');


  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const addItem = async () => {
    setIsShownTimeout('0')
    setCurrentIndex(tail);
    setInputValue('');
    await delay(time);
    queue.enqueue(inputValue);
    setStack([...queue.printQueue()]);
    setTail(queue.getTail());
    setHead(queue.getHead())
    setCurrentIndex(tail);
    await delay(time)
    setCurrentIndex(null);
    setIsShownTimeout('')
  }
  const delItem = async () => {
    setIsShownTimeout('1')
    setCurrentIndex(head);
    await delay(time);
    queue.dequeue();
    setStack([...queue.printQueue()]);
    setHead(queue.getHead())
    setCurrentIndex(null);
    setIsShownTimeout('')
  }
  const clear = async () => {
    setIsShownTimeout('2')
    queue.reset();
    setStack([...queue.printQueue()]);
    setHead(null);
    setTail(queue.getTail());
    await delay(time)
    setIsShownTimeout('')
  }


  return (
    <SolutionLayout title="Очередь">
      <form className={styles.input} onSubmit={(e) => e.preventDefault()}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={e => onChange(e)}
          type="text" 
          value={inputValue}
          extraClass={`${styles.inputStack}`}
        />
        <Button
          isLoader={isShownTimeout === '0'}
          text='Добавить'
          onClick={() => addItem()}
          disabled={inputValue ? false : true}
        />
        <Button
          isLoader={isShownTimeout === '1'}
          text='Удалить'
          onClick={delItem}
          disabled={head === null ? true : head < tail ? false : true}
        />
        <Button
          isLoader={isShownTimeout === '2'}
          text='Очистить'
          onClick={clear}
          extraClass={`${styles.btnNewArr} ${styles.btn}`}
          disabled={head === null ? true : false}
        />
      </form>
      {stack &&
        <ul className={styles.circle}>

          {stack?.map((item, index: number) => {
            return (
              <li key={index}>< Circle
                tail={tail <= head! ? '' : tail - 1 === index ? 'tail' : ''}
                head={head === null ? '' : head === index ? 'head' : ''}
                letter={item === null ? '' : item}
                key={index}
                index={index}
                state={index === currentIndex ? 'changing' : 'default'} />
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};