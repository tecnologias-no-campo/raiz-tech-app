//Componente que define um FormField personaliado com um menu no estilo DropDown para fazer campos de escolha

//Imports padrão
import React, { useState } from "react";
import { View } from "react-native";
import {Menu} from "react-native-paper";
import { styles } from "./styles";

//Components
import { FormField } from "../FormField";

interface DropDownMenuProps {
    titulo: string;
    mainColor: string;
    options: string[];
    onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export function DropDownMenu({titulo, mainColor, options, onSelect} : DropDownMenuProps)  {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(titulo);

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
                        label={titulo}
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
                            onSelect(option);
                            closeMenu();
                        }}
                        title={option}
                    />
                ))}
            </Menu>
        </View>
    )
}