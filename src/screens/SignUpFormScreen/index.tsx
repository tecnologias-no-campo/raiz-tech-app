//Tela que apresenta o formulário de cadastro no aplicativo, com informações pessoais dos produtores
import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { styles } from "./styles";

// Componentes
import { LoginStructure } from "../../components/LoginStructure";
import { SimpleButton } from "../../components/SimpleButton";
import { FormField } from "../../components/FormField";
import { DropDownMenu } from "../../components/DropDownMenu";

// Navegação
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Supabase
import { supabase } from "../../services/supabaseClient";

// O tipo 'Props' agora espera o 'userId'
type Props = NativeStackScreenProps<RootStackParamList, 'SignUpFormScreen'>;

export function SignUpFormScreen({ navigation, route }: Props) {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [fazenda, setFazenda] = useState('');
    const [cidade, setCidade] = useState('');
    const [areaTotal, setAreaTotal] = useState('');
    const [tipoProducao, setTipoProducao] = useState('');
    const [principalProduto, setPrincipalProduto] = useState('');
    const [numeroTrabalhadores, setNumeroTrabalhadores] = useState('');
    const [nivelTecnologia, setNivelTecnologia] = useState('');
    const [loading, setLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    // Pegando o 'userId' que foi passado pela tela anterior
    const { userId } = route.params;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const {data, error} = await supabase
                .from("produtores")
                .select("*")
                .eq("user_id", userId)
                .maybeSingle();

            if(error)   {
                console.warn(error);
            } else if(data) {
                setIsEditing(true);
                setNomeCompleto(data.nome_completo ?? "");
                setFazenda(data.nome_fazenda ?? "");
                setCidade(data.cidade ?? "");
                setAreaTotal(String(data.area_total_ha ?? ""));
                setTipoProducao(data.tipo_producao ?? "");
                setPrincipalProduto(data.principal_produto ?? "");
                setNumeroTrabalhadores(String(data.numero_trabalhadores ?? ""));
                setNivelTecnologia(data.nivel_tecnologia ?? "");
            }
            setLoading(false);
        })();
    }, [userId]);

    async function handleSubmit() {
        setLoading(true);

        const payload = {
            user_id: userId,
            nome_completo: nomeCompleto,
            nome_fazenda: fazenda,
            cidade,
            area_total_ha: areaTotal ? Number(areaTotal) : null,
            tipo_producao: tipoProducao,
            principal_produto: principalProduto,
            numero_trabalhadores: numeroTrabalhadores
                ? Number(numeroTrabalhadores)
                : null,
            nivel_tecnologia: nivelTecnologia,
        };

        const { error } = await supabase
            .from('produtores')
            .upsert(payload, {onConflict: "user_id"});

        setLoading(false);

        if (error) {
            Alert.alert('Erro ao Salvar Dados', 'Não foi possível salvar os dados. Tente novamente mais tarde.');
            console.error(error);
        } else {
            Alert.alert('Sucesso!', 'Seus dados foram salvos.');
            navigation.navigate("HomeScreen");
        }
    }

    return (
            <>
            <View style={styles.signUpScreen_container}>
                <LoginStructure>
                    <ScrollView contentContainerStyle={styles.signUpScreen_form}>
                        <FormField
                            label="Nome completo"
                            mainColor="#80A218"
                            keyboardType="default"
                            onChangeText={setNomeCompleto}
                            value={nomeCompleto}
                        />
                        <FormField
                            label="Fazenda"
                            mainColor="#80A218"
                            keyboardType="default"
                            onChangeText={setFazenda}
                            value={fazenda}
                        />
                        <FormField
                            label="Cidade"
                            mainColor="#80A218"
                            keyboardType="default"
                            onChangeText={setCidade}
                            value={cidade}
                        />
                        <FormField
                            label="Área total (hectares)"
                            mainColor="#80A218"
                            keyboardType="numeric"
                            onChangeText={setAreaTotal}
                            value={areaTotal}
                        />
                        <DropDownMenu
                            titulo="Tipo da produção"
                            mainColor="#80A218"
                            options={["Agrícola", "Pecuária", "Agropecuária", "Leiteira", "Avicultura", "Suinocultura", "Apicultura (abelhas)", "Piscultura (peixes)", "Agroindustrial", "Outros"]}
                            onSelect={setTipoProducao}
                        />
                        <FormField
                            label="Principal produto"
                            mainColor="#80A218"
                            keyboardType="default"
                            onChangeText={setPrincipalProduto}
                            value={principalProduto}
                        />
                        <FormField
                            label="Número de trabalhadores"
                            mainColor="#80A218"
                            keyboardType="numeric"
                            onChangeText={setNumeroTrabalhadores}
                            value={numeroTrabalhadores}
                        />
                        <DropDownMenu
                            titulo="Nível de Tecnologia"
                            mainColor="#80A218"
                            options={["Básico", "Médio", "Avançado"]}
                            onSelect={setNivelTecnologia}
                        />

                        <SimpleButton
                            title={loading ? "Salvando..." : isEditing ? "Salvar alterações" : "Registrar-se"}
                            mainColor="#80A218"
                            variant="primary"
                            onPress={handleSubmit}
                            disabled={loading}
                        />
                    </ScrollView>
                </LoginStructure>
        </View>
        </>
    )
}