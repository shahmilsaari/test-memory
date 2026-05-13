import * as Joi from 'joi';

type ValidatedEnvironment = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  CORS_ORIGINS: string;
};

const envValidationSchema: Joi.ObjectSchema<ValidatedEnvironment> = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  CORS_ORIGINS: Joi.string()
    .pattern(/^(?!.*\*)([^,\s]+)(\s*,\s*[^,\s]+)*$/)
    .default('http://localhost:3000'),
});

export const validateEnv = (
  config: Record<string, unknown>,
): ValidatedEnvironment => {
  const result = envValidationSchema.validate(config, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (result.error) {
    throw result.error;
  }

  return result.value;
};
