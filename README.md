# Validador de Movimentos de Xadrez

O presente projeto consta de uma API que tem como intenção verificar possíveis movimentos de peças em um tabuleiro de xadrez. Ao receber o nome de uma peça e sua posição atual, são calculadas as próximas posições possíveis. A peça do cavalo será a primeira a ser desenvolvida.

----

## Pré-requisitos

* É necessário ter **node** e **npm** instalados. O último *release* foi realizado com a versão 12.16.1 do node e 6.13.4 do npm.

----

## Procedimentos

* **Instalar dependências**: `npm i`

* **Executar em ambiente de desenvolvimento**: `npm run dev`

* **Compilar**: `npm run build`

* **Compilar e executar**: `npm start`

* **Executar testes unitários**: `npm run test`

----

## Estrutura de Arquivos

* **src/controllers/**: Validações de parâmetros de requisição e execução de lógicas, enviando resposta com o código correto;

* **src/routes/**: Mapeamento de rotas para as *controllers*;

* **src/app.ts**: Criação da aplicação, configura rotas e portas;

* **src/app.spec.ts**: Testes unitários para a aplicação;

* **src/swagger.json**: Documentação swagger que é utilizada para exibição;

* **src/server.ts**: Ponto de entrada da API, cria e executa servidor;

* **swagger.yaml**: Documentação swagger em formato yaml, recomendável utilizar para edição devido a simplicidade, e após isso exportar para um json.

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

A documentação *swagger* da API contendo as requisições também pode ser visualizada acessando `/api-docs`. Ex: *localhost:4000/api-docs*

----

## Como Contribuir para o Código

- Crie um *fork* do repositório remoto original (**upstream**);
- Faça um clone do seu *fork* na sua máquina local, e tenha o **upstream** também como repositório remoto para realizar fetch e rebase quando necessário;
- Crie uma *branch* a partir da *branch* **develop** atualizada do **upstream** (`git fetch upstream | git checkout develop | git rebase upstream/develop reset --hard`), o nome da *branch* deve estar em inglês e dar diretivas sobre o que está sendo modificado (Ex: `git checkout -b new-pieces`);
- Realize as modificações nessa *branch*, atentando para atualizar as documentações se necessário;
- Dê um `git push` para o seu *fork* e crie um *pull request* no repositório **upstream** da nova *branch* para a **develop**;
- Nesse *pull request* deve conter um título que resume o que está sendo implementado, a descrição das modificações realizadas, bem como testes realizados;
- O *pull request* pode estar escrito em português;
- Adição/modificação de funcionalidades exigem a criação/atualização de testes unitários, bem como evidências de funcionamento dos mesmos no *pull request*;
- Caso hajam conflitos no *pull request*, o criador do mesmo deve se encarregar de resolvê-los realizando um `git fetch upstream | git rebase upstream/develop`;
- Aguarde as alterações serem aceitas.

Todos os *pull requests* aceitos na *branch* **develop** entrarão para a master quando for gerada uma nova versão.

----

## Geração de Versões

A geração de versões se dará pela criação de um *pull request* da *branch* **develop** para a **master**, em que no título constará o número da versão, e na descrição haverão os títulos dos *pull requests* aceitos, bem como possíveis alterações diretas na develop (*hot fixes* e atualizações de documentação).

Após realizade o *merge*, será criada uma tag com o mesmo número descrito no *pull request* da **develop** para a **master**, sendo assim disponibilizado o novo *release*. Será utilizado versionamento semântico 2.0.0.

----

## Próximos Passos

- Criar uma interface para melhor visualização dos resultados obtidos e facilitar os testes;
- O código já está adaptado para o cálculo de possíveis posições para quase todas as peças, excluindo apenas os peões, bastando descomentar o código em **src/controllers/PositionsController.ts** e realizar os testes necessários para aprovação da funcionalidade;
- Para calcular o movimento de peões, diferentes situações devem ser consideradas, pois os mesmos possuem movimento estrito para frente, podendo se movimentar duas casas para frente se for seu primeiro movimento, enquanto que o ataque à outras peças só pode ser realizado na diagonal (algumas dessas propriedades já estão presentes em forma de comentário em **src/controllers/PositionsController.ts**);
- Considerar a presença de outras peças no tabuleiro, verificando se as mesmas são aliadas ou inimigas; pois se forem amigas, o movimento é impossível, se forem inimigas, o movimento termina ali eliminando aquela peça (lembrar de considerar o movimento dos peões para ataque);
- ...