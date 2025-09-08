//Componente que define um FormField personaliado com um menu no estilo DropDown para fazer campos de escolha

//Imports padrão
import React, { useState } from "react";
import { View } from "react-native";
import {Menu} from "react-native-paper";
import { styles } from "./styles";

//Components
import { FormField } from "../FormField";

interface DropDownMenuProps {
    mainColor: string;
    options: string[];
}

export function DropDownMenu({mainColor, options} : DropDownMenuProps)  {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState("Nível de uso de tecnologia");

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View>
            <Menu
                contentStyle={styles.dropDownMenu_menu}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                   
                    <FormField
                        label={selected}
                        onPress={openMenu}
                        mainColor={mainColor}
                        showSoftInputOnFocus={false}
                        caretHidden={true}
                        value={selected}
                    />
                }
            >
                {options.map((option: string, index: number) => (
                    <Menu.Item
                        key={index}
                        style={styles.dropDownMenu_menu_item}
                        titleStyle={styles.dropDownMenu_menu_item_title}
                        onPress={() => {
                            setSelected(option);
                            closeMenu();
                        }}
                        title={option}
                    />
                ))}
            </Menu>
        </View>
    )
}