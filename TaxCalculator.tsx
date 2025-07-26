import React, { useState, useEffect, useCallback } from 'react';

// Translations object for Internationalization (i18n)
const translations = {
    id: {
        title: "Perhitungan Pajak Minimum Global (Sederhana)", // Updated
        subtitle: "Model penyederhanaan berdasarkan PMK 136/2024. Masukkan nilai-nilai di bawah untuk melihat perhitungan.",
        inputSectionTitle: "Input Data Keuangan",
        consolidatedRevenueLabel: "Peredaran Bruto Konsolidasi Tahunan (EUR):",
        consolidatedRevenuePlaceholder: "Minimal",
        netAccountingProfitLossLabel: "Laba/Rugi Bersih Akuntansi Keuangan (IDR):",
        netAccountingProfitLossPlaceholder: "Contoh:",
        coveredTaxCurrentLabel: "Pajak Tercakup (Pajak Kini) (IDR):",
        coveredTaxCurrentPlaceholder: "Contoh:",
        coveredTaxDeferredLabel: "Pajak Tercakup (Pajak Tangguhan) (IDR):",
        coveredTaxDeferredPlaceholder: "Contoh:",
        excludedDividendsLabel: "Dividen yang Dikecualikan (IDR):",
        excludedDividendsPlaceholder: "Contoh:",
        excludedEquityGainsLossesLabel: "Keuntungan/Kerugian Ekuitas yang Dikecualikan (IDR):",
        excludedEquityGainsLossesPlaceholder: "Contoh:",
        otherAdjustmentsTitle: "Penyesuaian Lainnya (dalam IDR)",
        nonDeductibleExpensesLabel: "Biaya yang Tidak Dapat Dikurangkan (IDR):",
        nonDeductibleExpensesPlaceholder: "Contoh:",
        governmentFinesPenaltiesLabel: "Denda/Penalti Pemerintah (IDR):",
        governmentFinesPenaltiesPlaceholder: "Contoh:",
        fairValueAdjustmentsLabel: "Penyesuaian Nilai Wajar (IDR):",
        fairValueAdjustmentsPlaceholder: "Contoh:",
        taxTransparentEntityIncomeLabel: "Penghasilan Entitas Transparan Pajak (IDR):",
        taxTransparentEntityIncomePlaceholder: "Contoh:",
        qrtcAmountLabel: "QRTC (Qualified Refundable Tax Credits) (IDR):",
        qrtcAmountPlaceholder: "Contoh:",
        nonDeductibleIntraGroupFinancingLabel: "Biaya Pembiayaan Intra Grup Tidak Dapat Dikurangkan (IDR):",
        nonDeductibleIntraGroupFinancingPlaceholder: "Contoh:",
        portfolioDividendsElectionLabel: "Pilih: Masukkan Dividen Saham Portofolio",
        equityInvestmentInclusionElectionLabel: "Pilih: Masukkan Keuntungan/Kerugian Investasi Ekuitas & Entitas Transparan Pajak",
        calculationResultsTitle: "Hasil Perhitungan GMT",
        thresholdRevenueLabel: "Threshold Peredaran Bruto (EUR):",
        thresholdMet: "Terpenuhi",
        thresholdNotMet: "Tidak Terpenuhi",
        gmtNotApplicable: "Perhitungan GMT tidak berlaku karena threshold peredaran bruto tidak terpenuhi.",
        gloBEIncomeLossLabel: "Laba atau Rugi GloBE:",
        adjustedCoveredTaxLabel: "Pajak Tercakup yang Disesuaikan:",
        effectiveTaxRateLabel: "Tarif Pajak Efektif (ETR):",
        topUpTaxLabel: "Pajak Tambahan (Top-up Tax):",
        topUpTaxNote: "Pajak Tambahan ini akan dikenakan jika ETR di bawah",
        importantNotesTitle: "Catatan Penting:",
        note1: "Aplikasi ini adalah <span class='font-bold'>model penyederhanaan</span> untuk tujuan edukasi dan demonstrasi.", // Bolded
        note2: "Perhitungan Pajak Minimum Global (GloBE Rules) dalam PMK 136/2024 sangat kompleks dan melibatkan banyak penyesuaian detail yang tidak tercakup sepenuhnya di sini.",
        note3Title: "Penyesuaian umum yang Disimulasikan:", // Updated
        note3_1: "QRTC (Qualified Refundable Tax Credits): Diperlakukan sebagai penghasilan.",
        note3_2: "Biaya Pembiayaan Intra Grup yang Tidak Dapat Dikurangkan: Ditambahkan kembali ke laba GloBE.",
        note3_3: "Pilihan Dividen Saham Portofolio: Jika dipilih, dividen ini akan dimasukkan dalam laba GloBE (tidak dikecualikan).",
        note3_4: "Pilihan Investasi Ekuitas & Entitas Transparan Pajak: Jika dipilih, keuntungan/kerugian ekuitas dan penghasilan entitas transparan pajak akan dimasukkan dalam laba GloBE (tidak dikecualikan).",
        note4Title: "Penyesuaian Umum yang Tidak Disimulasikan dikarenakan Kompleksitasnya:", // Updated
        note4_1: "<span class='font-bold'>Prinsip Kewajaran dan Kelaziman Usaha (Arm's Length Principle) & Harga Transfer (Transfer Pricing)</span>", // Simplified
        note4_2: "<span class='font-bold'>Instrumen Lindung Nilai (Hedging Instrument)</span>", // Simplified
        note4_3: "<span class='font-bold'>Ketentuan Khusus Nilai Wajar Keuntungan/Kerugian Kepentingan Kepemilikan</span>", // Simplified
        note4_5: "<span class='font-bold'>Pelepasan Kepentingan Kepemilikan</span>", // Simplified
        note4_6: "<span class='font-bold'>Penyesuaian Pajak Tercakup Khusus untuk Pemilihan Investasi Ekuitas</span>", // Simplified
        note5: "Untuk perhitungan pajak yang akurat dan kepatuhan, selalu merujuk pada teks lengkap PMK 136/2024 dan berkonsultasi dengan Konsultan Pajak Terdaftar.",
        author: "Harry Wirahman",
        languageButton: "English",
        currencyIDR: "IDR",
        currencyEUR: "EUR",
        resetButton: "Reset"
    },
    en: {
        title: "Global Minimum Tax Calculation (Simplified)",
        subtitle: "A simplified model based on PMK 136/2024. Enter values below to see the calculation.",
        inputSectionTitle: "Financial Data Input",
        consolidatedRevenueLabel: "Annual Consolidated Revenue (EUR):",
        consolidatedRevenuePlaceholder: "Minimum",
        netAccountingProfitLossLabel: "Net Financial Accounting Profit/Loss (IDR):",
        netAccountingProfitLossPlaceholder: "Example:",
        coveredTaxCurrentLabel: "Covered Tax (Current Tax) (IDR):",
        coveredTaxCurrentPlaceholder: "Example:",
        coveredTaxDeferredLabel: "Covered Tax (Deferred Tax) (IDR):",
        coveredTaxDeferredPlaceholder: "Example:",
        excludedDividendsLabel: "Excluded Dividends (IDR):",
        excludedDividendsPlaceholder: "Example:",
        excludedEquityGainsLossesLabel: "Excluded Equity Gains/Losses (IDR):",
        excludedEquityGainsLossesPlaceholder: "Example:",
        otherAdjustmentsTitle: "Other Adjustments (in IDR)",
        nonDeductibleExpensesLabel: "Non-Deductible Expenses (IDR):",
        nonDeductibleExpensesPlaceholder: "Example:",
        governmentFinesPenaltiesLabel: "Government Fines/Penalties (IDR):",
        governmentFinesPenaltiesPlaceholder: "Example:",
        fairValueAdjustmentsLabel: "Fair Value Adjustments (IDR):",
        fairValueAdjustmentsPlaceholder: "Example:",
        taxTransparentEntityIncomeLabel: "Tax Transparent Entity Income (IDR):",
        taxTransparentEntityIncomePlaceholder: "Example:",
        qrtcAmountLabel: "QRTC (Qualified Refundable Tax Credits) (IDR):",
        qrtcAmountPlaceholder: "Example:",
        nonDeductibleIntraGroupFinancingLabel: "Non-Deductible Intra-Group Financing Expenses (IDR):",
        nonDeductibleIntraGroupFinancingPlaceholder: "Example:",
        portfolioDividendsElectionLabel: "Checked: Include Portfolio Share Dividends",
        equityInvestmentInclusionElectionLabel: "Checked: Include Equity Investment Gains/Losses & Tax Transparent Entity Income",
        calculationResultsTitle: "GMT Calculation Results",
        thresholdRevenueLabel: "Revenue Threshold (EUR):",
        thresholdMet: "Met",
        thresholdNotMet: "Not Met",
        gmtNotApplicable: "GMT calculation is not applicable as the revenue threshold is not met.",
        gloBEIncomeLossLabel: "GloBE Income or Loss:",
        adjustedCoveredTaxLabel: "Adjusted Covered Tax:",
        effectiveTaxRateLabel: "Effective Tax Rate (ETR):",
        topUpTaxLabel: "Top-up Tax:",
        topUpTaxNote: "This Top-up Tax will be imposed if the ETR is below",
        importantNotesTitle: "Important Notes:",
        note1: "This application is a <span class='font-bold'>simplified model</span> for educational and demonstration purposes.",
        note2: "The Global Minimum Tax (GloBE Rules) calculations in PMK 136/2024 are highly complex and involve many detailed adjustments not fully covered here.",
        note3Title: "Simulated General Adjustments:",
        note3_1: "Treated as income.",
        note3_2: "Added back to GloBE income.",
        note3_3: "If checked, these dividends will be included in GloBE income (not excluded).",
        note3_4: "If checked, equity gains/losses and tax transparent entity income will be included in GloBE income (not excluded).",
        note4Title: "Non Simulated General Adjustments due to Complexity:",
        note4_1: "<span class='font-bold'>Arm's Length Principle & Transfer Pricing</span>",
        note4_2: "<span class='font-bold'>Hedging Instruments</span>",
        note4_3: "<span class='font-bold'>Specific Provisions for Fair Value Gains/Losses on Equity Interests</span>",
        note4_5: "<span class='font-bold'>Disposal of Equity Interests</span>",
        note4_6: "<span class='font-bold'>Specific Covered Tax Adjustments for Equity Investment Election</span>",
        note5: "For accurate tax calculations and compliance, always refer to the full text of PMK 136/2024 and consult with a Registered Tax Consultant.",
        author: "Harry Wirahman",
        languageButton: "Bahasa Indonesia",
        currencyIDR: "IDR",
        currencyEUR: "EUR",
        resetButton: "Reset"
    }
};

const TaxCalculator = () => {
    const [language, setLanguage] = useState('en');
    const t = translations[language];

    const [netAccountingProfitLoss, setNetAccountingProfitLoss] = useState(0);
    const [coveredTaxCurrent, setCoveredTaxCurrent] = useState(0);
    const [coveredTaxDeferred, setCoveredTaxDeferred] = useState(0);
    const [excludedDividends, setExcludedDividends] = useState(0);
    const [excludedEquityGainsLosses, setExcludedEquityGainsLosses] = useState(0);
    const [nonDeductibleExpenses, setNonDeductibleExpenses] = useState(0);
    const [governmentFinesPenalties, setGovernmentFinesPenalties] = useState(0);
    const [fairValueAdjustments, setFairValueAdjustments] = useState(0);
    const [taxTransparentEntityIncome, setTaxTransparentEntityIncome] = useState(0);
    const [consolidatedRevenue, setConsolidatedRevenue] = useState(0);
    const [qrtcAmount, setQrtcAmount] = useState(0);
    const [nonDeductibleIntraGroupFinancing, setNonDeductibleIntraGroupFinancing] = useState(0);
    const [portfolioDividendsElection, setPortfolioDividendsElection] = useState(false);
    const [equityInvestmentInclusionElection, setEquityInvestmentInclusionElection] = useState(false);

    const [gloBEIncomeLoss, setGloBEIncomeLoss] = useState(0);
    const [adjustedCoveredTax, setAdjustedCoveredTax] = useState(0);
    const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
    const [topUpTax, setTopUpTax] = useState(0);
    const [isThresholdMet, setIsThresholdMet] = useState(false);

    const GLOBAL_MINIMUM_TAX_RATE = 0.15;
    const REVENUE_THRESHOLD_EUR = 750000000;

    const toggleLanguage = () => setLanguage(prevLang => (prevLang === 'id' ? 'en' : 'id'));

    const handleReset = () => {
        setNetAccountingProfitLoss(0);
        setCoveredTaxCurrent(0);
        setCoveredTaxDeferred(0);
        setExcludedDividends(0);
        setExcludedEquityGainsLosses(0);
        setNonDeductibleExpenses(0);
        setGovernmentFinesPenalties(0);
        setFairValueAdjustments(0);
        setTaxTransparentEntityIncome(0);
        setConsolidatedRevenue(0);
        setQrtcAmount(0);
        setNonDeductibleIntraGroupFinancing(0);
        setPortfolioDividendsElection(false);
        setEquityInvestmentInclusionElection(false);
    };

    const calculateGMT = useCallback(() => {
        const thresholdMet = consolidatedRevenue >= REVENUE_THRESHOLD_EUR;
        setIsThresholdMet(thresholdMet);

        if (!thresholdMet) {
            setGloBEIncomeLoss(0);
            setAdjustedCoveredTax(0);
            setEffectiveTaxRate(0);
            setTopUpTax(0);
            return;
        }

        let calculatedGloBEIncomeLoss = netAccountingProfitLoss + coveredTaxCurrent + coveredTaxDeferred;
        if (!portfolioDividendsElection) calculatedGloBEIncomeLoss -= excludedDividends;
        if (!equityInvestmentInclusionElection) {
            calculatedGloBEIncomeLoss -= excludedEquityGainsLosses;
            calculatedGloBEIncomeLoss -= taxTransparentEntityIncome;
        }
        calculatedGloBEIncomeLoss += nonDeductibleExpenses + governmentFinesPenalties + fairValueAdjustments + qrtcAmount + nonDeductibleIntraGroupFinancing;
        setGloBEIncomeLoss(calculatedGloBEIncomeLoss);

        let calculatedAdjustedCoveredTax = coveredTaxCurrent + coveredTaxDeferred;
        setAdjustedCoveredTax(calculatedAdjustedCoveredTax);

        let calculatedETR = calculatedGloBEIncomeLoss > 0 ? calculatedAdjustedCoveredTax / calculatedGloBEIncomeLoss : 0;
        setEffectiveTaxRate(calculatedETR);

        let calculatedTopUpTax = (calculatedGloBEIncomeLoss > 0 && calculatedETR < GLOBAL_MINIMUM_TAX_RATE) ? (GLOBAL_MINIMUM_TAX_RATE - calculatedETR) * calculatedGloBEIncomeLoss : 0;
        setTopUpTax(calculatedTopUpTax);
    }, [
        netAccountingProfitLoss, coveredTaxCurrent, coveredTaxDeferred, excludedDividends, excludedEquityGainsLosses,
        nonDeductibleExpenses, governmentFinesPenalties, fairValueAdjustments, taxTransparentEntityIncome,
        consolidatedRevenue, qrtcAmount, nonDeductibleIntraGroupFinancing, portfolioDividendsElection, equityInvestmentInclusionElection
    ]);

    useEffect(() => {
        calculateGMT();
    }, [calculateGMT]);

    const formatCurrency = (value: number) => new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2 }).format(value);
    const formatPercentage = (value: number) => new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value);
    
    const InputField = ({ id, label, value, onChange, placeholder }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-emerald-800 mb-1">{label}</label>
            <input type="number" id={id} value={value}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(parseFloat(e.target.value) || 0)}
                   className="mt-1 block w-full px-3 py-2 bg-white/80 border border-emerald-300 rounded-md shadow-sm text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition"
                   placeholder={placeholder} />
        </div>
    );

    const CheckboxField = ({ id, label, checked, onChange }) => (
        <div className="flex items-center">
            <input type="checkbox" id={id} checked={checked}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
                   className="h-4 w-4 text-emerald-600 bg-emerald-100 border-emerald-300 focus:ring-emerald-500 rounded" />
            <label htmlFor={id} className="ml-3 block text-sm font-medium text-emerald-800">{label}</label>
        </div>
    );

    return (
        <div className="min-h-screen p-4 sm:p-8 font-sans text-emerald-900">
            <div className="max-w-4xl mx-auto bg-emerald-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-10 border border-emerald-200/60 relative">
                <div className="flex justify-end gap-2 mb-6">
                    <button onClick={toggleLanguage} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 transition duration-150 ease-in-out text-sm font-semibold">
                        {t.languageButton}
                    </button>
                    <button onClick={handleReset} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-150 ease-in-out text-sm font-semibold">
                        {t.resetButton}
                    </button>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 mb-4">
                    {t.title}
                </h1>
                <p className="text-center text-emerald-600 mb-10">{t.subtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-emerald-50/70 backdrop-blur-sm p-6 rounded-xl border border-emerald-200/60">
                        <h2 className="text-xl font-semibold text-emerald-700 mb-4">{t.inputSectionTitle}</h2>
                        <div className="space-y-4">
                            <InputField id="consolidatedRevenue" label={t.consolidatedRevenueLabel} value={consolidatedRevenue} onChange={setConsolidatedRevenue} placeholder={`${t.consolidatedRevenuePlaceholder} ${REVENUE_THRESHOLD_EUR} ${t.currencyEUR}`} />
                            <InputField id="netAccountingProfitLoss" label={t.netAccountingProfitLossLabel} value={netAccountingProfitLoss} onChange={setNetAccountingProfitLoss} placeholder={`${t.netAccountingProfitLossPlaceholder} 1000000000`} />
                            <InputField id="coveredTaxCurrent" label={t.coveredTaxCurrentLabel} value={coveredTaxCurrent} onChange={setCoveredTaxCurrent} placeholder={`${t.coveredTaxCurrentPlaceholder} 150000000`} />
                            <InputField id="coveredTaxDeferred" label={t.coveredTaxDeferredLabel} value={coveredTaxDeferred} onChange={setCoveredTaxDeferred} placeholder={`${t.coveredTaxDeferredPlaceholder} 20000000`} />
                            <InputField id="excludedDividends" label={t.excludedDividendsLabel} value={excludedDividends} onChange={setExcludedDividends} placeholder={`${t.excludedDividendsPlaceholder} 50000000`} />
                            <InputField id="excludedEquityGainsLosses" label={t.excludedEquityGainsLossesLabel} value={excludedEquityGainsLosses} onChange={setExcludedEquityGainsLosses} placeholder={`${t.excludedEquityGainsLossesPlaceholder} 10000000`} />
                        </div>
                    </div>
                    <div className="bg-emerald-50/70 backdrop-blur-sm p-6 rounded-xl border border-emerald-200/60">
                        <h2 className="text-xl font-semibold text-emerald-700 mb-4">{t.otherAdjustmentsTitle}</h2>
                        <div className="space-y-4">
                            <InputField id="nonDeductibleExpenses" label={t.nonDeductibleExpensesLabel} value={nonDeductibleExpenses} onChange={setNonDeductibleExpenses} placeholder={`${t.nonDeductibleExpensesPlaceholder} 5000000`} />
                            <InputField id="governmentFinesPenalties" label={t.governmentFinesPenaltiesLabel} value={governmentFinesPenalties} onChange={setGovernmentFinesPenalties} placeholder={`${t.governmentFinesPenaltiesPlaceholder} 2000000`} />
                            <InputField id="fairValueAdjustments" label={t.fairValueAdjustmentsLabel} value={fairValueAdjustments} onChange={setFairValueAdjustments} placeholder={`${t.fairValueAdjustmentsPlaceholder} 3000000`} />
                            <InputField id="taxTransparentEntityIncome" label={t.taxTransparentEntityIncomeLabel} value={taxTransparentEntityIncome} onChange={setTaxTransparentEntityIncome} placeholder={`${t.taxTransparentEntityIncomePlaceholder} 4000000`} />
                            <InputField id="qrtcAmount" label={t.qrtcAmountLabel} value={qrtcAmount} onChange={setQrtcAmount} placeholder={`${t.qrtcAmountPlaceholder} 1000000`} />
                            <InputField id="nonDeductibleIntraGroupFinancing" label={t.nonDeductibleIntraGroupFinancingLabel} value={nonDeductibleIntraGroupFinancing} onChange={setNonDeductibleIntraGroupFinancing} placeholder={`${t.nonDeductibleIntraGroupFinancingPlaceholder} 500000`} />
                            <div className="pt-2 space-y-3">
                                <CheckboxField id="portfolioDividendsElection" label={t.portfolioDividendsElectionLabel} checked={portfolioDividendsElection} onChange={setPortfolioDividendsElection} />
                                <CheckboxField id="equityInvestmentInclusionElection" label={t.equityInvestmentInclusionElectionLabel} checked={equityInvestmentInclusionElection} onChange={setEquityInvestmentInclusionElection} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50/80 backdrop-blur-sm p-6 rounded-xl shadow-inner border border-emerald-200/60">
                    <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">{t.calculationResultsTitle}</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-emerald-200 pb-3">
                            <span className="font-medium text-emerald-700">{t.thresholdRevenueLabel}</span>
                            <span className={`font-bold text-lg px-3 py-1 rounded-md ${isThresholdMet ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                {isThresholdMet ? t.thresholdMet : t.thresholdNotMet}
                            </span>
                        </div>
                        {!isThresholdMet ? (
                            <p className="text-red-600 text-center font-semibold pt-4">{t.gmtNotApplicable}</p>
                        ) : (
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-center border-b border-emerald-200/70 pb-3">
                                    <span className="font-medium text-emerald-700">{t.gloBEIncomeLossLabel}</span>
                                    <span className="font-mono font-bold text-lg text-emerald-900">{formatCurrency(gloBEIncomeLoss)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-emerald-200/70 pb-3">
                                    <span className="font-medium text-emerald-700">{t.adjustedCoveredTaxLabel}</span>
                                    <span className="font-mono font-bold text-lg text-emerald-900">{formatCurrency(adjustedCoveredTax)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-emerald-200/70 pb-3">
                                    <span className="font-medium text-emerald-700">{t.effectiveTaxRateLabel}</span>
                                    <span className={`font-mono font-bold text-lg ${effectiveTaxRate < GLOBAL_MINIMUM_TAX_RATE ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatPercentage(effectiveTaxRate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-3">
                                    <span className="font-bold text-xl text-emerald-700">{t.topUpTaxLabel}</span>
                                    <span className="font-mono font-bold text-xl text-emerald-700">{formatCurrency(topUpTax)}</span>
                                </div>
                                {topUpTax > 0 && (
                                    <p className="text-amber-600 text-center text-sm pt-2">{t.topUpTaxNote} {formatPercentage(GLOBAL_MINIMUM_TAX_RATE)}.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-10 p-5 bg-emerald-50/70 backdrop-blur-sm rounded-lg border border-emerald-200/60 text-sm text-emerald-700">
                    <h3 className="font-semibold text-emerald-800 mb-3">{t.importantNotesTitle}</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li dangerouslySetInnerHTML={{ __html: t.note1.replace("font-bold", "font-bold text-emerald-800") }}></li>
                        <li>{t.note2}</li>
                        <li><span className="font-bold text-emerald-800">{t.note3Title}</span>
                            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                <li><span className="font-semibold text-emerald-800">QRTC (Qualified Refundable Tax Credits):</span> {t.note3_1}</li>
                                <li><span className="font-semibold text-emerald-800">Non-Deductible Intra-Group Financing Expenses:</span> {t.note3_2}</li>
                                <li><span className="font-semibold text-emerald-800">Portfolio Share Dividends Election:</span> {t.note3_3}</li>
                                <li><span className="font-semibold text-emerald-800">Equity Investment & Tax Transparent Entity Income Election:</span> {t.note3_4}</li>
                            </ul>
                        </li>
                        <li><span className="font-bold text-emerald-800">{t.note4Title}</span>
                            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                <li dangerouslySetInnerHTML={{ __html: t.note4_1.replace("font-bold", "font-bold text-emerald-800") }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_2.replace("font-bold", "font-bold text-emerald-800") }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_3.replace("font-bold", "font-bold text-emerald-800") }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_5.replace("font-bold", "font-bold text-emerald-800") }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t.note4_6.replace("font-bold", "font-bold text-emerald-800") }}></li>
                            </ul>
                        </li>
                        <li>{t.note5}</li>
                    </ul>
                </div>

                <div className="text-center text-sm text-emerald-600 mt-8">
                    <a href="https://www.linkedin.com/in/wirahman/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold transition">
                        {t.author}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TaxCalculator;