packge com.caps
public class Funcionario {

    //encapsulamento dos atributos

    private String nome;
    private String cpf;
    private String cargo;
    private double salario;
    

    public Funcionario(String nome, String cpf, String cargo, double salario) {
        this.nome = nome;
        this.cpf = cpf;
        this.cargo = cargo;
        this.salario = salario;
    }

    //regra de negócio encapsulamento
    public void aumentarSalario(double percentual) {
        if (percentual > 0) {
            this.salario += this.salario * percentual / 100;
        }
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }
}

