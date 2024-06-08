import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, getCarts, updateToCart, removeFromCart } from '../api/database';
import { useAuthContext } from '../context/AuthContext';

export default function useCarts() {
  const queryClient = useQueryClient();
  const {user : {uid}} = useAuthContext();

  const cartsQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCarts(uid),
    enabled: !!uid      // uid 존재하는 경우에만 호출
  });

  const addCart = useMutation({
    mutationFn: ({product}) => addToCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['carts', uid]})
  });

  const updateItem = useMutation({
    mutationFn: ({product}) => updateToCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['carts', uid]})
  });

  const removeItem = useMutation({
    mutationFn: ({product}) => removeFromCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['carts', uid]})
  })

  return {cartsQuery, addCart, updateItem, removeItem};
}