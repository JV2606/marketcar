'use client'
import React, { useState } from 'react'
import '../MarketCar/marketCar.css'

interface CursoLF {
  id: number,
  titulo: string,
  preco: number
}

interface IshoppingItem {
  produto: CursoLF,
  quantidade: number
}

const cursos: CursoLF[] = [
  { id: 1, titulo: 'Como ganhar na Lotofácil', preco: 1200.00 },
  { id: 2, titulo: 'Como ganhar na Megasena', preco: 1350.00 },
  { id: 3, titulo: 'Como ganhar no Tigrinho', preco: 1500.00 },
  { id: 4, titulo: 'Como ganhar na Blaze', preco: 800.00 },
]

const formatarPreco = (preco: number): string => preco.toFixed(2);

const MarketCarPages = () => {
  const [shoppingCurso, setShoppingCurso] = useState<IshoppingItem[]>([]);

  const handleAddCurso = (id: number) => {
    const curso = cursos.find(curso => curso.id === id);
    const cursoExisteShopping = shoppingCurso.find(item => item.produto.id === id);

    if (cursoExisteShopping) {
      const newShoppingCurso: IshoppingItem[] = shoppingCurso.map(item => {
        if (item.produto.id === id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
      setShoppingCurso(newShoppingCurso);
      return;
    }

    const carItem: IshoppingItem = {
      produto: curso!,
      quantidade: 1
    };

    const newShoppingCurso: IshoppingItem[] = [...shoppingCurso, carItem];
    setShoppingCurso(newShoppingCurso);
  }

  const handleRemoveCurso = (id: number) => {
    const cursoExisteShopping = shoppingCurso.find(item => item.produto.id === id);

    if (cursoExisteShopping!.quantidade > 1) {
      const newShoppingCurso: IshoppingItem[] = shoppingCurso.map(item => {
        if (item.produto.id === id) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      });
      setShoppingCurso(newShoppingCurso);
      return;
    }

    const newShoppingCurso: IshoppingItem[] = shoppingCurso.filter(item => item.produto.id !== id);
    setShoppingCurso(newShoppingCurso);
  }

  const totalCurso = shoppingCurso.reduce((total, item) => {
    return total + (item.produto.preco * item.quantidade);
  }, 0);
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
        printWindow.document.write('<html><head><title>Imprimir Carrinho</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Itens do Carrinho</h1>');
        printWindow.document.write('<ul>');
        shoppingCurso.forEach(item => {
            printWindow.document.write(`<li>
                Título: ${item.produto.titulo}<br>
                Preço: R$ ${formatarPreco(item.produto.preco)}<br>
                Quantidade: ${item.quantidade}<br>
                Total: R$ ${formatarPreco(item.produto.preco * item.quantidade)}
            </li>`);
        });
        printWindow.document.write('</ul>');
        printWindow.document.write('<p>Total Geral: R$ ' + formatarPreco(totalCurso) + '</p>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
};




<button onClick={handlePrint}>Imprimir Carrinho</button>
  return (
    <div className="container">
      <h1 className="header">Curso Jogos de Azar</h1>
      <h2 className="cart-header">Carrinho: R$ {formatarPreco(totalCurso)}</h2>
      <ul className="course-list">
        {cursos.map(curso => (
          <li key={curso.id}>
            <p>{curso.titulo}</p>
            <p>Preço: R$ {formatarPreco(curso.preco)}</p>
            <button onClick={() => handleAddCurso(curso.id)}>Adicionar</button>
          </li>
        ))}
      </ul>
      <ul className="shopping-list">
        {shoppingCurso.map(item => (
          <li key={item.produto.id}>
            <p>Título: {item.produto.titulo}</p>
            <p>Preço: R$ {formatarPreco(item.produto.preco)}</p>
            <p>Quantidade: {item.quantidade}</p>
            <p className="total">Total: R$ {formatarPreco(item.produto.preco * item.quantidade)}</p>
            <button onClick={() => handleRemoveCurso(item.produto.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MarketCarPages