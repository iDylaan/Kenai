from transformers import AutoModelForCausalLM, AutoTokenizer

def main():
    model_path = "./llama2-13b"

    # Carga el tokenizador y el modelo desde el directorio local
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(model_path)

    # Texto de entrada para el modelo
    input_text = "The capital of France is"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    # Genera la salida utilizando el modelo
    output = model.generate(input_ids, max_length=50, num_return_sequences=1)
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    print(f"Generated text: {generated_text}")

if __name__ == "__main__":
    main()
