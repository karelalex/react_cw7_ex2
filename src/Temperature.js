import React from "react";
import {SCALE_NAMES} from "./constatnts";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {Card} from "primereact/card";

export class Temperature extends React.PureComponent {

    handleTemperatureChange = (e) => {
        this.props.onTemperatureChange(e.value)
    }
    handleRangeChange = (e) => {
        this.props.onRangeChange(e.value)
    }

    render() {
        const {scale, temperature, range, rangeLimits} = this.props
        const [minLimit = -20, maxLimit = 150] = rangeLimits;
        const [minRange, maxRange] = range;
        return (
            <Card title={`Температура в градусах ${SCALE_NAMES[scale]}`}>
                <div className="p-field p-grid">
                    <label> Температура </label>
                    <div className="p-col">
                        <InputNumber
                            value={temperature}
                            onChange={this.handleTemperatureChange}
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            min={Number(minRange)}
                            max={Number(maxRange)}
                            size={6}
                        />
                    </div>
                </div>
                <div className="p-field">
                    <label>Ограничение от {minRange} до {maxRange}</label>
                    <Slider value={range} onChange={this.handleRangeChange} range min={minLimit} max={maxLimit}/>

                </div>
            </Card>
        )
    }
}
