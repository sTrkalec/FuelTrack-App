import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import { LoginUser } from '../../services/LoginUser/service';
import { Navigate } from 'react-router-dom';
import './style.css';
import { UserRegistrationModal } from '../../components/modals/RegisterUserModal';

export default function Login() {

    const [cpfError, setCpfError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registerUserModalOpen, setRegisterUserModalOpen] = useState(false);


    const validateCPF = (cpf: any) => {
        let sum = 0;
        let remainder;

        if (cpf === '00000000000') return false;

        for (let i = 1; i <= 9; i++)
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++)
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };




    const CPFValidator = z
        .string()
        .max(11, { message: 'O CPF deve ter no máximo 11 dígitos' })
        .transform((val) => val.trim())
        .refine((val) => /^[0-9]*$/.test(val), {
            message: 'O CPF deve conter apenas dígitos',
        });

    const AllValidations = CPFValidator.refine(validateCPF, {
        message: 'CPF inválido',
    });


    const login = z.object({
        cpf: AllValidations,
        password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    });

    type LoginFormInput = z.infer<typeof login>;

    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormInput>({
        resolver: zodResolver(login),
    });

    const validateCPFInput = (cpfValue: string) => {
        if (cpfValue) {
            try {
                AllValidations.parse(cpfValue);
                setCpfError(null);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setCpfError(error.errors[0].message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        } else {
            setCpfError(null);
        }
    };


    const handleCPFChange = async (e: any) => {
        const cpfValue = e.target.value;
        validateCPFInput(cpfValue);
    };


    const isTokenExpired = (token: string) => {
        try {
            const [, payload] = token.split('.');
            const decodedPayload = JSON.parse(atob(payload));
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedPayload.exp < currentTime) {
                return true;
            }
            return false;
        } catch (err) {
            return true;
        }
    };


    async function submitDataForm(data: LoginFormInput) {
        try {
            const responseData = await LoginUser(data.cpf, data.password);
            let token = responseData.token;
            sessionStorage.setItem('token', token);


            if (isTokenExpired(token)
            ) {
                setError('password', { type: 'manual', message: 'Sessão expirada' });
                return;
            }

            else {
                setIsAuthenticated(true); // atualiza a variável de estado para true
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    // verifica se o usuário está autenticado e renderiza o componente Navigate se necessário
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }  



    const handleRegisteUserOpenModal = () => {
        setRegisterUserModalOpen(true);
    };
    const handleRegisteUserCloseModal = () => {
        setRegisterUserModalOpen(false);
    };

    return (
        <div className='main'>
            <Container maxWidth="xs" className='container'>
                <Typography variant="h4" align="center" sx={{ mb: 2 }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(submitDataForm)}>
                    <TextField
                        label="CPF"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        {...register('cpf')}
                        error={cpfError ? true : false}
                        helperText={cpfError || ''}
                        onChange={handleCPFChange}
                        autoComplete="username" // Adicionando o atributo autocomplete
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        {...register('password')}
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password.message : ''}
                        autoComplete="current-password" // Adicionando o atributo autocomplete
                    />
                    <Button className='buttonSave' type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
                        Entrar
                    </Button>
                </form>
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item>
                        <Button onClick={handleRegisteUserOpenModal}>Registrar</Button>
                    </Grid>
                </Grid>
            </Container>

            <UserRegistrationModal open={registerUserModalOpen} onClose={handleRegisteUserCloseModal}  ></UserRegistrationModal>
        </div>
    );
}
