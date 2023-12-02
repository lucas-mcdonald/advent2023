
# get input from input.txt
with open('input.txt', 'r') as f:
    input_arr = f.read().splitlines()

DIGITS = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five':5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}



# Find value for each line
def get_calibration_value(input_str: str):
    first_digit = {
        "digit": None,
        "index": -1
    }
    last_digit = {
        "digit": None,
        "index": -1
    }
    def update_digits(digit, index):
        if first_digit.get("index") == -1 or first_digit.get("index") > index:
            first_digit["digit"] = digit
            first_digit["index"] = index
        if last_digit.get("index") < index:
            last_digit["digit"] = digit
            last_digit["index"] = index
    for word, digit in DIGITS.items():
        word_idx = input_str.find(word)
        digit_idx = input_str.find(str(digit))
        if word_idx != -1:
            update_digits(DIGITS.get(word), word_idx)
        if digit_idx != -1:
            update_digits(int(digit), digit_idx)
        word_idx = input_str.rfind(word)
        digit_idx = input_str.rfind(str(digit))
        if word_idx != -1:
            update_digits(DIGITS.get(word), word_idx)
        if digit_idx != -1:
            update_digits(int(digit), digit_idx)
    if (last_digit['index'] == -1):
        last_digit['digit'] = first_digit['digit']

    return first_digit['digit']*10 + last_digit['digit']

    
# Improvements:
# 1. Search for first and last digit seperately, in different directions
# 2. Hoist update function



# Sum values
print("Output: ", sum(get_calibration_value(input_str) for input_str in input_arr))