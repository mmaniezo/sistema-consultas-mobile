import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Especialidade } from "../types/especialidade";
import { Paciente } from "../types/paciente";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, OdibeeSans_400Regular } from '@expo-google-fonts/odibee-sans';

export default function App() {

const STORAGE_KEY = "@consultas:consulta_atual";

//Utilizando as classes criadas

const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
  descricao: "Cuidados com o coração",
};

const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};

const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
  telefone: "(11) 98765-4321",
};

//Estado Tipado com useState
const consultaInicial: Consulta = {
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  };

  const [consulta, setConsulta] = useState<Consulta>(consultaInicial);

  useEffect(() => {
    carregarConsulta();
  }, []);

  async function carregarConsulta() {
    try {
      const consultaSalva = await AsyncStorage.getItem(STORAGE_KEY);
      if (consultaSalva) {
        const consultaObjeto = JSON.parse(consultaSalva);
        consultaObjeto.data = new Date(consultaObjeto.data);
        setConsulta(consultaObjeto);
      }
    } catch (erro) {
      console.error("Erro ao carregar consulta:", erro);
    }
  }

  async function salvarConsulta(consultaAtualizada: Consulta) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(consultaAtualizada)
      );
    } catch (erro) {
      console.error("Erro ao salvar consulta:", erro);
    }
  }

  /**
   * Funções para manipular a consulta
   * 
   * Essas funções serão passadas como props para o componente.
   * O componente não altera o estado diretamente - ele apenas
   * "comunica" ao pai (App) que uma ação foi solicitada.
   */

function confirmarConsulta() {
    const consultaAtualizada = {
      ...consulta,
      status: "confirmada" as const,
    };
    setConsulta(consultaAtualizada);
    salvarConsulta(consultaAtualizada);
  }

  function cancelarConsulta() {
    const consultaAtualizada = {
      ...consulta,
      status: "cancelada" as const,
    };
    setConsulta(consultaAtualizada);
    salvarConsulta(consultaAtualizada);
  }

function formatarValor(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data: Date): string {
  return data.toLocaleDateString("pt-BR");
}

let [fontsLoaded] = useFonts({
    OdibeeSans_400Regular,
  });

  // 3. Verificar se já carregou (evita erro de renderização)
  if (!fontsLoaded) {
    return null; 
  }


return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>

                {/* 
          Componente ConsultaCard
          
          Veja como ficou mais simples!
          Antes: ~100 linhas de JSX no App.tsx
          Agora: 1 componente reutilizável
          
          Props:
          - consulta: objeto com todos os dados
          - onConfirmar: função a ser chamada ao confirmar
          - onCancelar: função a ser chamada ao cancelar
        */}
        <ConsultaCard
          consulta={consulta}
          onConfirmar={confirmarConsulta}
          onCancelar={cancelarConsulta}
        />

      </ScrollView>
    </View>
);
}