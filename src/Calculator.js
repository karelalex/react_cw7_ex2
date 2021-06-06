import React from "react";
import {Temperature} from "./Temperature";
import {Boiling} from "./Boiling";
import {CELSIUS, FAHRENHEIT} from "./constatnts";
import {Panel} from "primereact/panel";

const toCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
}

const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
}

export class Calculator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            scale: CELSIUS,
            rangeScale: CELSIUS,
            range: [0, 100]
        }
        this.RANGE_LIMITS_CELSIUS = [-30, 150]
        this.RANGE_LIMITS_FAHRENHEIT = this.RANGE_LIMITS_CELSIUS.map(toFahrenheit)
    }


    tryConvert = (temperature, convert) => {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    handleTemperatureChange = (e) => {
        const temperature = Number(e.target.value)
        this.setState({temperature})
    }

    render() {
        const {temperature, scale, range, rangeScale} = this.state
        const celsius = scale === CELSIUS ?
            temperature :
            this.tryConvert(temperature, toCelsius)
        const fahrenheit = scale === FAHRENHEIT ?
            temperature :
            this.tryConvert(temperature, toFahrenheit)
        const celsiusRange = rangeScale === CELSIUS ? range :
            range.map((item) => this.tryConvert(item, toCelsius));
        const fahrenheitRange = rangeScale === FAHRENHEIT ? range :
            range.map((item) => this.tryConvert(item, toFahrenheit))
        return (
            <Panel class='p-panel'>
                <div className="p-grid p-justify-center">
                    <div className="p-col-4">
                        <Temperature
                            scale={CELSIUS}
                            temperature={celsius}
                            onTemperatureChange={
                                (temperature) => {
                                    this.setState({
                                        scale: CELSIUS,
                                        temperature
                                    })
                                }
                            }
                            range={celsiusRange}
                            onRangeChange={(range) => this.setState({
                                range,
                                rangeScale: CELSIUS
                            })}
                            rangeLimits={this.RANGE_LIMITS_CELSIUS}
                        />
                    </div>
                    <div className="p-col-4 p-offset-1">
                        <Temperature
                            scale={FAHRENHEIT}
                            temperature={fahrenheit}
                            onTemperatureChange={
                                (temperature) => {
                                    this.setState({
                                        scale: FAHRENHEIT,
                                        temperature
                                    })
                                }
                            }
                            range={fahrenheitRange}
                            onRangeChange={(range) => this.setState({
                                range,
                                rangeScale: FAHRENHEIT
                            })}
                            rangeLimits={this.RANGE_LIMITS_FAHRENHEIT}
                        />
                    </div>
                </div>
                <div className="p-grid p-justify-center">
                    <div className="p-col-2">
                        <Panel header="Состояние воды">
                            <Boiling celsius={celsius}/>
                        </Panel>
                    </div>
                </div>

            </Panel>
        )
    }
}
