import React, { useState, useEffect } from 'react';
import { useDarkMode } from 'react-native-dark-mode';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StatusBar,
    RefreshControl,
} from 'react-native';
import { AreaChart, Grid, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Numeral from 'numeral';

import {
    stylesDark,
    stylesLight,
    styles,
    accentDark,
    accentLight,
} from './Styles';

import { ThemedStylesProvider } from './ThemedStylesContext';
import Section from './components/Section';
import { getPriceData } from './API';

const App = () => {
    const isDarkMode = useDarkMode();
    const themedStyles = isDarkMode ? stylesDark : stylesLight;
    const accentColor = isDarkMode ? accentDark : accentLight;

    const [ refreshing, setRefreshing ] = useState(true);
    const [ currentPrice, setCurrentPrice ] = useState(null);
    const [ historicalData, setHistoricalData ] = useState(null);
    const [ updatedDate, setUpdatedDate ] = useState(null);
    const [ error, setError ] = useState(null);

    const refresh = async () => {
        setRefreshing(true);
        
        const json = await getPriceData('btc');
        if (!json) {
            setError('No connection.');
        } else {
            setError(null);
            setCurrentPrice(json.price);
            setHistoricalData(json.history);
            setUpdatedDate(new Date());
        }

        setRefreshing(false);
    };

    const priceText = () => {
        if (error)
            return error;

        if (currentPrice)
            return Numeral(currentPrice).format('$0.00');
        
        return 'Loading...';
    };

    const contentInset = { top: 30, bottom: 30 };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <ThemedStylesProvider value={themedStyles}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={themedStyles.background}
                    refreshControl={<RefreshControl onRefresh={() => { refresh() }} refreshing={refreshing} />}>
                    <View style={[styles.body, themedStyles.background]}>
                        <Section title="Bitcoin (BTC) price" text={priceText()} />
                        { historicalData ? 
                        <Section title="Last 7 days">
                            <View style={{ height: 200, flexDirection: 'row' }}>
                                <YAxis
                                    data={ historicalData }
                                    svg={{
                                        fill: accentColor,
                                        fontSize: 10,
                                    }}
                                    contentInset={ contentInset }
                                    numberOfTicks={ 5 }
                                    formatLabel={ value => Numeral(value).format('$0.00') }
                                />
                                <AreaChart
                                    style={{ flex: 1, marginLeft: 16 }}
                                    data={ historicalData }
                                    contentInset={ contentInset }
                                    curve={ shape.curveNatural }
                                    svg={{ fill: accentColor }}>
                                    <Grid/>
                                </AreaChart>
                            </View>
                        </Section>
                        : null }
                        { updatedDate ? 
                        <View>
                            <Text style={[styles.footer, themedStyles.text]}>Updated: { updatedDate.toString() }</Text>
                        </View>
                        : null }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedStylesProvider>
    );
};

export default App;
