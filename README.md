# Validador de Movimentos de Xadrez

O presente projeto consta de uma API que tem como intenção verificar possíveis movimentos de peças em um tabuleiro de xadrez. Ao receber o nome de uma peça e sua posição atual, são calculadas as próximas posições possíveis. A peça do cavalo será a primeira a ser desenvolvida.

----

## Pré-requisitos

* É necessário ter node e npm instalados. O último release foi realizado com a versão 12.16.1 do node e 6.13.4 do npm.

----

## Procedimentos

* **Instalar dependências**: `npm i`

* **Executar em ambiente de desenvolvimento**: `npm run dev`

* **Compilar**: `npm run build`

* **Compilar e executar**: `npm start`

----

## Estrutura de Arquivos

* **src/controllers/**: Validações de parâmetros de requisição e execução de lógicas , enviando resposta com o código correto;

* **src/routes/**: Mapeamento de rotas para os controllers;

* **src/index.ts**: Ponto de entrada da API, cria e executa servidor.

----

## Requisições disponíveis

* **URL**

  /positions/:piece&:position

* **Método:**

  `GET`
  
*  **Parâmetros da URL**

   **Obrigatórios:**
 
   `piece=[string]`
   `position=[string]`

* **Resposta de sucesso**

  * **Status:** 200 OK <br />
    **Conteúdo:** `{ "data": ["D2", "C3", "A3"] }`

* **Resposta de Erro:**

  * **Status:** 400 Bad Request <br />
    **Conteúdo:** `{ "error" : "invalid-position" }`
  ou
  * **Status:** 500 Internal Server Error <br />
    **Conteúdo:** `{ "error" : "<error message>" }`

* **Exemplo de chamada:**

  ```javascript
    $.ajax({
      url: "/positions/horse&B1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

----

## Próximos Passos