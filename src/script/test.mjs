import { useState, useCallback, useEffect } from 'react'
import { Image, Col, Layout, Row, Space, Typography, Button } from 'antd'
import logo from 'static/images/solanaLogo.svg'
import './index.less'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'
require('@solana/wallet-adapter-react-ui/styles.css')

function View() {
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()
    const [balance, setBalance] = useState(0)

    const getMyBalance = useCallback(async () => {
        if (!publicKey) return setBalance(0)
        const lamports = await connection.getBalance(publicKey)
        setBalance(lamports)
        console.log('balance: ' + lamports / LAMPORTS_PER_SOL)
    }, [connection, publicKey])

    useEffect(() => {
        getMyBalance()
    }, [getMyBalance])

    const air = async () => {
        if (publicKey) {
            await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
        }
    }

    const transfer = async () => {
        console.log('transfering...')
        if (publicKey) {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: Keypair.generate().publicKey,
                    lamports: 10 ** 8,
                }),
            )

            const {
                context: { slot: minContextSlot },
                value: { blockhash, lastValidBlockHeight },
            } = await connection.getLatestBlockhashAndContext()

            const signature = await sendTransaction(transaction, connection, { minContextSlot })

            await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })
        } else {
            console.log('no publickey')
        }
    }

    return (
        <Layout className="container">
            <Row gutter={[24, 24]}>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Space direction="vertical" size={24}>
                        <Image src={logo} preview={false} width={256} />
                        <Typography.Title level={1}>React + Solana = DApp</Typography.Title>
                        <Button type="primary" size="large">
                            Let's go
                        </Button>
                        <WalletMultiButton></WalletMultiButton>
                        my balance: {balance / LAMPORTS_PER_SOL}
                        <Button type="primary" onClick={air}>
                            airdrop
                        </Button>
                        <Button type="primary" onClick={transfer}>
                            transfer
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Layout>
    )
}

export default View
