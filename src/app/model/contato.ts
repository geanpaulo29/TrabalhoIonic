export class Contato {
    private _nome: string;
    private _telefone: string;
    private _dataNascimento?: string;
    private _genero?: string;

    constructor(nome: string, telefone: string, dataNascimento?: string, genero?: string) {
        this._nome = nome;
        this._telefone = telefone;
        this._dataNascimento = dataNascimento;
        this._genero = genero;
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }

    public get telefone(): string {
        return this._telefone;
    }
    public set telefone(value: string) {
        this._telefone = value;
    }

   public get dataNascimento(): string | undefined {
        return this._dataNascimento;
    }

    public set dataNascimento(value: string | undefined) {
        this._dataNascimento = value;
    }

    public get genero(): string | undefined {
        return this._genero;
    }

    public set genero(value: string | undefined) {
        this._genero = value;
    }
}