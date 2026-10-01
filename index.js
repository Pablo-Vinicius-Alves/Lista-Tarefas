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
        return result.concluida = true;
    }

    tarefasDisponiveis() {
        const disponiveis = [];

        for (const [nome, tarefa] of this.tarefas) {
            const concluidas = tarefa.dependecias.every(dep => {
                const dependecias = this.tarefas.get(dep);
                return dependecias.concluida
            })
            if (tarefa.concluida === true) {
                continue;
            }

            if (concluidas) {
                disponiveis.push(nome);
            }
        }
        return disponiveis;
    }

}
const projeto = new GerenciadorTarefas();
projeto.adicionarTarefa("fundacao", []);
projeto.adicionarTarefa("paredes", ["fundacao"]);
projeto.adicionarTarefa("telhado", ["paredes"]);

console.log(projeto.tarefasDisponiveis());

projeto.concluirTarefa("fundacao");
console.log(projeto.tarefasDisponiveis());

// projeto.concluirTarefa("fundacao");
// console.log(projeto.tarefas.get("fundacao"));
// // esperado: { dependecias: [], concluida: true }

// console.log(projeto.tarefas.get("paredes"));
// esperado: { dependecias: ["fundacao"], concluida: false }
// const projeto = new GerenciadorTarefas();
// projeto.adicionarTarefa("fundação", []);
// projeto.adicionarTarefa("paredes", ["fundação"]);

// try {
//     projeto.concluirTarefa("paredes");
// } catch (e) {
//     console.log("Erro esperado:", e.message);
// }

// projeto.concluirTarefa("fundação");
// projeto.concluirTarefa("paredes");

// console.log(projeto.tarefas.get("paredes"));