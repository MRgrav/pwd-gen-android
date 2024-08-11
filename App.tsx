import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { ErrorMessage, Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, "should be be minimum of 4 characters")
  .max(16, "should be be maximum of 16 characters")
  .required("length is required")
})

const App = () => {

  const [password, setPassword] = useState('')
  const [isPasswordGenereted, setIsPasswordGenereted] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
  
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength)
    console.log(passwordResult)
    setPassword(passwordResult);
    setIsPasswordGenereted(true);
  }
  
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }
  
  const resetPassword = () => {
    setPassword('')
    setIsPasswordGenereted(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            onSubmit={values => {
              console.log(values)
              generatePasswordString(Number(values.passwordLength))
            }}
          >
            {({ touched, isValid, errors, handleChange, handleSubmit, handleReset, values }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    ) }
                  </View>
                  <TextInput 
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange("passwordLength")}
                      placeholder='Ex. 8'
                      keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#2977bb"
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#2977bb"
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#2977bb"
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#2977bb"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                  disabled={!isValid}
                  style={styles.primaryBtn}
                  onPress={() => { 
                    handleSubmit()
                    // generatePasswordString
                  }}
                  >
                    <Text style={styles.primaryBtnText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset()
                      resetPassword()
                    }}
                  >
                    <Text style={styles.secondaryBtnText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {/* { isPasswordGenereted ? ( */}
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text style={styles.generatedPassword}>
              {password}
            </Text>
          </View>  
        {/* ) : null} */}
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer: {},
  formContainer: {
    margin: 16
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    margin: 8
  },
  formActions: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row"
  },
  heading: {
    flex: 1,
    fontWeight: "600"
  },
  inputColumn: {
    marginVertical: 8,
    flex: 1
  },
  inputStyle: {
    paddingHorizontal: 14,
    paddingVertical: 4
  },
  errorText: {
    color: "red"
  },
  primaryBtn: {
    backgroundColor: "#6666ff",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    marginHorizontal: 10,
    flex: 1
  },
  primaryBtnText: {
    color: "white",
    textAlign: "center"
  },
  secondaryBtn: {
    backgroundColor: "#ff6666",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    marginHorizontal: 10,
    flex: 1
  },
  secondaryBtnText: {
    color: "white",
    textAlign: "center"
  },
  card: {
    backgroundColor: "#eeeeee",
    borderRadius: 16,
    padding: 18,
    margin: 20
  },
  cardElevated: {
    elevation: 2
  },
  subTitle: {
    fontWeight: "600"
  },
  description: {
    fontStyle: "italic",
    fontWeight: "300",
    textAlign: "center"
  },
  generatedPassword : {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center"
  }
})