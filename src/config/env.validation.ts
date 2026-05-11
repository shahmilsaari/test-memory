import * as Joi from 'joi';

type ValidatedEnvironment = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  app: {
    port: number;
  };
};

const envValidationSchema: Joi.ObjectSchema<Omit<ValidatedEnvironment, 'app'>> =
  Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: Joi.number().port().default(3000),
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

  const env = result.value;

  return {
    ...env,
    app: {
      port: env.PORT,
    },
  };
};
