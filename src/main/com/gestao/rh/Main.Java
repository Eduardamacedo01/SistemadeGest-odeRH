package com.gestao.rh;

public class Main {
    public static void main(String[] args) {

        Funcionario funcionario1 = new Funcionario("João Silva", "123.456.789-00", "Analista de Sistemas", 5000.00);
        Gerente gerente1 = new Gerente("Maria Oliveira", "987.654.321-00", 8000.00, "TI");

        System.out.println(funcionario1.getNome() + " - " + funcionario1.getCargo() + " - Salário: R$" + funcionario1.getSalario());
        System.out.println(gerente1.toString());

        // Aumentar salário do funcionário
        funcionario1.aumentarSalario(10);
         // Aumenta 10%
        System.out.println("Após aumento, " + funcionario1.getNome() + " tem salário: R$" + funcionario1.getSalario());
        

    }
}