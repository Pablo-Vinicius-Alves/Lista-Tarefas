class GerenciadorTarefas {
    constructor() {
        this.tarefas = new Map();
    }

    adicionarTarefa(nome, dependecias) {
        if (this.tarefas.has(nome)) {
            throw new Error("Essa tarefa já existe!");
        };
        for (const de of dependecias) {
            if (!this.tarefas.has(de)) {
                throw new Error("Dependência inexistente");
            }
        }

        this.tarefas.set(nome, { dependecias: dependecias, concluida: false });
    }

    concluirTarefa(nome) {
        if (!this.tarefas.has(nome)) {
            throw new Error("Essa tarefa não existe!");
        };
        const result = this.tarefas.get(nome);

        result.dependecias.forEach(e => {

            const dependecia = this.tarefas.get(e);

            if (!dependecia.concluida) {
                throw new Error(`Ainda não está concluido ${e}`);
            }
        });
        return result;
    }

}

const projeto = new GerenciadorTarefas();
projeto.adicionarTarefa("Fundação", []);
projeto.adicionarTarefa("Paredes", ["Fundação"]);

console.log(projeto.tarefas.get("Paredes"));