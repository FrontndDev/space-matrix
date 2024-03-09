import { Component } from "vue";

export interface IMyButton {
    id: number;
    name: string;
    type: string;
    disabled?: boolean;
    icon?: Component;
    price?: number;
}