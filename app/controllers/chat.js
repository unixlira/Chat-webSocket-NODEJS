module.exports.iniciaChat = function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 Caracteres').len(3,15);

    /*Recuperar os Erros */
    var erros = req.validationErrors();

    if (erros){
        res.render("index", {validacao : erros});
        return; 
   }

   application.get('io').emit(
       'msgParaCliente',
       {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}

    );

    res.render("chat", {dadosForm : dadosForm});
}