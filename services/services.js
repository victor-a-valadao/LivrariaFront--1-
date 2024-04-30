const axios = require("axios");
const endereco =
  "https://2eef6210-4290-4e32-be22-94cd5b4017e5-00-zv4bslrmtrnm.kirk.replit.dev/";
module.exports = class Services {
  //VERIFICAR USUÁRIO
  static async FuncionarioLogin(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "login",
      method: "POST",
      data: valores,
    };
    axios(options).then((funcionario) => {
      if (funcionario != undefined) {
        return res.render("logado");
      }
    });
  }

  //Create funcionário
  static async FuncionarioCreate(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "add_funcionario",
      method: "POST",
      data: valores,
    };
    axios(options);
    const mensagem = "Cadastro realizado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  //////LIVRO//////

  //Create livro
  static async LivroCreate(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "add_livro",
      method: "POST",
      data: valores,
    };
    axios(options);
    const mensagem = "Cadastro realizado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  //LISTAR
  static async LivroListar(req, res) {
    const options = {
      url: endereco + "livros",
      method: "GET",
      data: {},
    };
    axios(options).then((response) => {
      console.log(response.data);
      const livro = response.data;
      res.render("livros/listar", { livro });
    });
  }

  //COOKIES
  static async CarrinhoAdicionar(req, res) {
    const Item = {
      id: req.params.id,
      titulo: req.params.titulo,
    };
    // Verificando se já existe um cookie para o carrinho
    if (req.cookies.carrinho) {
      // Se já existe, adiciona o novo item
      const carrinho = JSON.parse(req.cookies.carrinho);
      carrinho.push(Item);
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
    } else {
      // Se não existe, cria um novo carrinho com o item
      const carrinho = [Item];
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
    }
    res.send("Item adicionado ao carrinho");
  }
  // Rota para remover um item do carrinho
  static async CarrinhoRemoverItem(req, res) {
    const itemDeletar = req.params.item;
    // Verificando se existe um cookie para o carrinho
    if (req.cookies.carrinho) {
      // Obtendo o carrinho atual do cookie
      let carrinho = JSON.parse(req.cookies.carrinho);
      // Removendo o item do carrinho, se existir
      carrinho = carrinho.filter((item) => item.id !== itemDeletar);
      // Atualizando o cookie com o carrinho modificado
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
      res.send("Item removido do carrinho");
    } else {
      res.send("Carrinho vazio");
    }
  }

  static async CarrinhoListar(req, res) {
    // Rota para exibir o carrinho
    if (req.cookies.carrinho) {
      const carrinho = JSON.parse(req.cookies.carrinho);
      res.render("carrinhos/Listar", { carrinho });
    } else {
      res.send("Carrinho vazio");
    }
  }
};
