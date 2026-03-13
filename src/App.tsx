/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [display, setDisplay] = useState('');
  const [lastWasOperator, setLastWasOperator] = useState(false);

  const operators = ['/', '*', '+', '-'];

  const onButtonPress = (label: string) => {
    if (label === 'C') {
      setDisplay('');
      setLastWasOperator(false);
      return;
    }

    if (operators.includes(label)) {
      if (display === '' || lastWasOperator) {
        return; // Prevent starting with operator or double operators
      }
      setDisplay((prev) => prev + label);
      setLastWasOperator(true);
    } else {
      setDisplay((prev) => prev + label);
      setLastWasOperator(false);
    }
  };

  const onSolution = () => {
    if (!display) return;
    try {
      // Using Function constructor as a safer alternative to eval for simple math
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${display}`)();
      setDisplay(String(result));
      setLastWasOperator(false);
    } catch (error) {
      setDisplay('Erro');
      setLastWasOperator(false);
    }
  };

  const limparTudo = () => {
    setDisplay('');
    setLastWasOperator(false);
  };

  const fecharPrograma = () => {
    // In a web app, we can't "close" the window easily, but we can clear it
    setDisplay('Encerrado');
    setTimeout(() => setDisplay(''), 1000);
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['.', '0', 'C', '+'],
  ];

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-white/10"
      >
        <h1 className="text-white text-center text-xl font-bold mb-2">Calculadora Kivy</h1>

        {/* VISOR (DISPLAY) */}
        <div className="h-24 bg-[#ffff00] rounded-lg flex items-center justify-end px-4 overflow-hidden border-4 border-neutral-700">
          <span className="text-black text-5xl font-bold tracking-tighter truncate">
            {display || '0'}
          </span>
        </div>

        {/* GRADE DE BOTÕES */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((label) => {
            let bgColor = 'bg-neutral-700 hover:bg-neutral-600';
            if (operators.includes(label)) bgColor = 'bg-[#ff9900] hover:bg-[#e68a00]';
            if (label === 'C') bgColor = 'bg-[#b33333] hover:bg-[#992d2d]';

            return (
              <button
                key={label}
                onClick={() => onButtonPress(label)}
                className={`${bgColor} text-white text-2xl font-bold h-16 rounded-xl transition-colors shadow-lg active:scale-95`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* BOTÃO DE IGUAL */}
        <button
          onClick={onSolution}
          className="w-full bg-[#0080e6] hover:bg-[#0073cc] text-white text-3xl font-bold h-20 rounded-xl transition-colors shadow-lg active:scale-95"
        >
          =
        </button>

        {/* BOTÕES INFERIORES */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={limparTudo}
            className="bg-[#cc0000] hover:bg-[#b30000] text-white text-sm font-bold h-14 rounded-xl transition-colors shadow-lg active:scale-95"
          >
            LIMPAR TUDO
          </button>
          <button
            onClick={fecharPrograma}
            className="bg-[#009900] hover:bg-[#008000] text-white text-sm font-bold h-14 rounded-xl transition-colors shadow-lg active:scale-95"
          >
            FECHAR
          </button>
        </div>
      </motion.div>
    </div>
  );
}
