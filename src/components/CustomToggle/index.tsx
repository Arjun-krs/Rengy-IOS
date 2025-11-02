import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Typo from "../Typo";

interface Props {
    label: string;
    value: "Yes" | "No" | null;
    onSelect: (value: "Yes" | "No") => void;
    error?: any;
}

const CustomToggleSelect: React.FC<Props> = ({ label, value, onSelect, error }) => {
    const renderButton = (option: "Yes" | "No") => {
        const isSelected = value === option;

        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    borderWidth: isSelected ? 2 : 0,
                    borderRadius: 12,
                    borderColor: "#70F4C3",
                }}
                onPress={() => onSelect(option)}
                activeOpacity={0.9}
            >
                {isSelected ? (
                    <LinearGradient
                        colors={["#FFFFFF", "#70F4C34D"]}
                        locations={[0, 0.9]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.button, { borderWidth: 0 }]}
                    >
                        <Typo
                            style={[styles.text, styles.selectedText]}
                            label={option}
                        />
                    </LinearGradient>
                ) : (
                    <View
                        style={[
                            styles.button,
                            !isSelected && {
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 3,
                            },
                        ]}
                    >
                        <Text style={styles.text}>{option}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ gap: 12 }}>
            {label && (
                <Typo
                    color={error ? "#FF0004" : "#030204"}
                    label={label}
                    variant="bodyMediumTertiary"
                />
            )}

            <View style={{ flexDirection: "row", gap: 12 }}>
                {renderButton("Yes")}
                {renderButton("No")}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        elevation: 5,
    },
    text: {
        fontSize: 16,
        color: "#030204",
        paddingVertical: 12,
    },
    selectedText: {
        fontFamily: "GeneralSans-Medium",
        color: "#030204",
    },
});

export default CustomToggleSelect;
