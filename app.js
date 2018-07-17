/* Importar as configurações do servidor */

var app = require('./config/server');

/* Parametrizar a porta http EX. 8080 */

var server = app.listen(8080, function(){
    console.log('Servidor On Line');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/*Criar uma conexão com webSocket */

io.on('connection', function(socket){
    console.log('Usuario Conectou');

    socket.on('disconnect', function(){
        console.log('Usuario Desconectou');
        
    });

    socket.on('msgParaServidor', function(data){
        
        /*Diálogo */
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        /*Participantes */
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0)
        {
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
        }
    });
});