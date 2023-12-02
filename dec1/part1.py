with open('input.txt', 'r') as f:
    input_arr = f.read().splitlines()

# Find value for each line
def get_calibration_value(input_str: str):
    first_digit = None
    last_digit = None
    for character in input_str:
        if character.isdigit() and first_digit is None:
            first_digit = int(character)
        elif character.isdigit():
            last_digit = int(character)
    if last_digit is None:
        last_digit = first_digit
    return first_digit * 10 + last_digit

# Sum values
print("Output: ", sum(calibration_value for calibration_value in map(get_calibration_value, input_arr)))