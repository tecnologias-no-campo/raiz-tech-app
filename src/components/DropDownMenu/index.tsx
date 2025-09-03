import React, { useState } from "react";
import { View } from "react-native";
import {Menu, Button} from "react-native-paper";
import { styles } from "./styles";
import { FormField } from "../FormField";

export function DropDownMenu()  {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState("Nível de uso de tecnologia");

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View>
            <Menu
                contentStyle={styles.menu}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                   
                    <FormField
                        label="Email"
                        onPress={openMenu}
                        mainColor="#80A218"
                        showSoftInputOnFocus={false}
                        caretHidden={true}
                        value={selected}
                    />
                }
            >
                <Menu.Item
                    style={styles.menu_item}
                    titleStyle={styles.menu_item_title}
                    onPress={() => {
                        setSelected("Básico");
                        closeMenu();
                    }}
                    title= "Básico"
                />

                <Menu.Item
                    style={styles.menu_item}
                    titleStyle={styles.menu_item_title}
                    onPress={() => {
                        setSelected("Médio");
                        closeMenu();
                    }}
                    title= "Médio"
                />

                <Menu.Item
                    style={styles.menu_item}
                    titleStyle={styles.menu_item_title}
                    onPress={() => {
                        setSelected("Avançado");
                        closeMenu();
                    }}
                    title= "Avançado"
                />
            </Menu>
        </View>
    )
}