if (typeof setImmediate === 'undefined') {
  global.setImmediate = setTimeout as unknown as typeof setImmediate;
}

import { ThemedText } from '@/components/ThemedText'
import { onboarding } from '@/constants'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from "react-native-swiper"

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const handleSkip = () => {
        router.replace("/(auth)/signin");
    }
    
    const handleLastSlide = () => {
        if (activeIndex === onboarding.length - 1) {
            router.replace("/(auth)/signin");
        } else {
            swiperRef.current?.scrollBy(1);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {activeIndex !== onboarding.length - 1 && (
                <TouchableOpacity style={styles.skipbtn} onPress={handleSkip}>
                    <ThemedText type="defaultSemiBold" style={styles.skipText}>Skip</ThemedText>
                </TouchableOpacity>
            )}
            
            <Swiper 
                style={styles.wrapper}
                ref={swiperRef}
                loop={false}
                showsPagination={true}
                dot={<View style={styles.dot} />}        
                activeDot={<View style={styles.activeDot} />} 
                onIndexChanged={(index) => setActiveIndex(index)}
                scrollEnabled={true}
                removeClippedSubviews={false}
            >
                {onboarding.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image 
                            source={item.image} 
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <View style={styles.textContainer}>
                            <ThemedText type="defaultSemiBold" style={styles.title}>
                                {item.title}
                            </ThemedText>
                            <ThemedText type="default" style={styles.description}>
                                {item.description}
                            </ThemedText>
                        </View>
                    </View>
                ))}
            </Swiper>
            
            <TouchableOpacity 
                style={[
                    styles.nextButton,
                    activeIndex === onboarding.length - 1 && styles.getStartedButton
                ]} 
                onPress={handleLastSlide}
            >
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                    {activeIndex === onboarding.length - 1 ? "Get Started" : "Next"}
                </ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    skipbtn: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    skipText: {
        fontSize: 16,
        color: '#4A5568',
    },
    wrapper: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
        color: '#1A202C',
        lineHeight: 32,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4A5568',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
        backgroundColor: '#E2E8F0',
    },
    activeDot: {
        width: 30,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
        backgroundColor: '#3182CE',
    },
    nextButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#3182CE',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: '80%',
    },
    getStartedButton: {
        backgroundColor: '#38A169',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default Onboarding