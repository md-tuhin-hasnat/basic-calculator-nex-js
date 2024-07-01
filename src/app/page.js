'use client'

import { useState, useEffect } from "react";
import style from "./Home.module.css";

export default function Home(){
  const [string,setString] = useState("");
  const [answer,setAnswer] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  function displayString(sym){
    setString((prev)=> prev+sym);
  }

  function backSpace(){
    setAnswer("");
    setString((prev)=> {
      let newString="";
      for(let i = 0; i<prev.length-1;++i){
        newString = newString+prev[i];
      }
      return newString;
    });
  }

  function clearScreen(){
    setString("");
    setAnswer("");
  }

  function evaluate(){
    setAnswer(()=>{
      var evaluable = "";
      for(let i = 0; i<string.length; ++i){
        let val = string[i];
        if(val==='÷'){
          evaluable+='/';
        }
        else if(val==='×'){
          evaluable+='*';
        }
        else{
          evaluable+=val;
        }
      }
      var ans = "";
      if(evaluable!=""){
        try{
          ans = eval(evaluable).toString();
        }
        catch(e){
          ans = "Math Error";
        }
      }
      return ans;
    });
  }

  function btnClick(sym){
    if(sym != "=" && sym != "⌫" && sym != "C"){
      displayString(sym);
    }
    else if(sym === "⌫"){
      backSpace();
    }
    else if(sym === "C"){
      clearScreen();
    }
    else if(sym === "="){
      evaluate();
    }
  }

  function handleChange(event){
    var val = event.target.value;
    if(val[0] === '0'){
      val = val.slice(1);
    }
    setString(val)
  }

  const handleKeyDown = (event) => {
    const allowed = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','Backspace','c','C','%','.']

    if (!allowed.includes(event.key)) {
        event.preventDefault();
    }

    if(event.key==='Backspace'){
      setAnswer("");
    }
    else if(event.key==='C' || event.key==='c'){
      clearScreen();
      event.preventDefault();
    }
    else if(event.key==='*'){
      event.preventDefault();
      let target = event.target;
      let inputValue = event.target.value;
      let start = target.selectionStart;
      let end = target.selectionEnd;
      const newValue = inputValue.substring(0, start) + '×' + inputValue.substring(end);
      setString(newValue);
    }
    else if(event.key==='/'){
      event.preventDefault();
      let target = event.target;
      let inputValue = event.target.value;
      let start = target.selectionStart;
      let end = target.selectionEnd;
      const newValue = inputValue.substring(0, start) + '÷' + inputValue.substring(end);
      setString(newValue);
    }
  }

  const detectMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPad|iPhone|iPod/.test(userAgent);
  };

  useEffect(()=>{
    setIsMobile(detectMobileDevice());
  },[isMobile]);


  useEffect(()=>{
    document.addEventListener("keydown", handleShortcut);
    function handleShortcut(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        evaluate();
      }
    }
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  });


  return (
  <div className={style.outline}>
    <div className={style.display}>
      <input
        className={style.calcString}
        type="text"
        value={string===""?0:string}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        readOnly={isMobile}
        />
      <p className={style.ans}>{answer===""?0:answer}</p>
    </div>
    <button className={style.btn1} onClick={()=>btnClick("C")}>C</button>
    <button className={style.btn2} onClick={()=>btnClick("÷")}>÷</button>
    <button className={style.btn3} onClick={()=>btnClick("×")}>×</button>
    <button className={style.btn4} onClick={()=>btnClick("⌫")}>⌫</button>
    <button className={style.btn5} onClick={()=>btnClick("7")}>7</button>
    <button className={style.btn6} onClick={()=>btnClick("8")}>8</button>
    <button className={style.btn7} onClick={()=>btnClick("9")}>9</button>
    <button className={style.btn8} onClick={()=>btnClick("-")}>-</button>
    <button className={style.btn9} onClick={()=>btnClick("4")}>4</button>
    <button className={style.btn10} onClick={()=>btnClick("5")}>5</button>
    <button className={style.btn11} onClick={()=>btnClick("6")}>6</button>
    <button className={style.btn12} onClick={()=>btnClick("+")}>+</button>
    <button className={style.btn13} onClick={()=>btnClick("1")}>1</button>
    <button className={style.btn14} onClick={()=>btnClick("2")}>2</button>
    <button className={style.btn15} onClick={()=>btnClick("3")}>3</button>
    <button className={style.btnEq} onClick={()=>btnClick("=")}>=</button>
    <button className={style.btn16} onClick={()=>btnClick("%")}>%</button>
    <button className={style.btn17} onClick={()=>btnClick("0")}>0</button>
    <button className={style.btn18} onClick={()=>btnClick(".")}>.</button>
  </div>);
}